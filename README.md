# Code Dictionary

HTML / CSS / JavaScript 개념과 예제를 카드 + 사이드바 네비게이션으로 정리한 개인 문서형 웹 프로젝트입니다.

- 카테고리: HTML / CSS / JavaScript
- 목적: 자주 쓰는 문법/패턴을 빠르게 찾아보고 복습하기
- 배포: Vercel

## Demo
- https://code-dictionary.vercel.app/

## Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla)

## Features
- **Global Navigation**: 모든 페이지에서 동일한 사이드바 네비게이션 사용
- **TOC 자동 생성**: 섹션(`.entry-section[data-toc]`) 기반 우측 목차 생성
- **코드 복사 버튼**: 코드 블록에 Copy 버튼 자동 추가
- **반응형 레이아웃**: 화면 크기에 맞춰 레이아웃 최적화

## Project Structure (예시)
```txt
code-dictionary/
├─ index.html
├─ assets/
│  ├─ css/
│  └─ js/
├─ 01_html/
├─ 02_css/
└─ 03_javascript/