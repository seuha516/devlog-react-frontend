import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import { changeField, initWritePost } from 'modules/blog/writeBlog';

window.katex = katex;
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/ImageResize', ImageResize);

const TitleInput = styled.input`
  width: 100%;
  font-size: 40px;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 15px;
  padding-bottom: 0.5rem;
`;
const SubTitleInput = styled.input`
  width: 100%;
  font-size: 20px;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 25px;
  padding: 0 5px 0.5rem 5px;
`;
const QuillWrapper = styled.div`
  .ql-editor {
    padding: 15px;
    min-height: 320px;
    max-height: 450px;
  }
`;

const Editor = () => {
  const dispatch = useDispatch();
  const { title, body, subTitle } = useSelector(({ writeBlog }) => ({
    title: writeBlog.title,
    subTitle: writeBlog.subTitle,
    body: writeBlog.body,
  }));

  useEffect(() => {
    return () => {
      dispatch(initWritePost());
    };
  }, [dispatch]);

  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch]);

  return (
    <>
      <TitleInput
        placeholder="Title"
        onChange={(e) => {
          onChangeField({ key: 'title', value: e.target.value });
        }}
        value={title}
      />
      <SubTitleInput
        placeholder="SubTitle"
        onChange={(e) => {
          onChangeField({ key: 'subTitle', value: e.target.value });
        }}
        value={subTitle}
      />
      <BodyBlock onChangeField={onChangeField} body={body} />
    </>
  );
};

const BodyBlock = ({ onChangeField, body }) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정
  hljs.configure({
    languages: ['javascript', 'python', 'c++'],
  });

  useEffect(() => {
    const modules = {
      syntax: { highlight: (text) => hljs.highlightAuto(text).value },
      toolbar: {
        container: [
          [
            { font: [] },
            { size: ['small', false, 'large', 'huge'] },
            { header: ['1', '2', '3', '4', '5', '6'] },
          ],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }, 'formula', 'blockquote'],
          [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video', 'code-block'],
          ['clean'],
        ],
      },
      imageUploader: {
        upload: (file) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);
            fetch(
              process.env.REACT_APP_API_IMAGE,
              {
                method: 'POST',
                body: formData,
                credentials: 'include',
              },
              {
                withCredentials: true,
              },
            )
              .then((response) => response.json())
              .then((result) => {
                resolve(`${process.env.REACT_APP_API_IMAGE}/${result}`);
              })
              .catch((error) => {
                alert('이미지 업로드 실패');
              });
          }),
      },
      clipboard: { matchVisual: false },
      ImageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white',
        },
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    };
    const formats = [
      'font',
      'size',
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'color',
      'background',
      'script',
      'formula',
      'blockquote',
      'align',
      'list',
      'link',
      'image',
      'video',
      'code-block',
    ];
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요...',
      modules: modules,
      formats: formats,
    });
    quillInstance.current.root.setAttribute('spellcheck', 'false');
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  return (
    <QuillWrapper>
      <div ref={quillElement} />
    </QuillWrapper>
  );
};

export default Editor;
