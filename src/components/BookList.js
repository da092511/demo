//JSX
// ㄴ Javascript

import React, {useEffect, useRef, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

const BookList = () =>{
    // useState 는 화면 렌더링에 반영됨
    const [bookList,setBookList] = useState([]); //[]빈 배열
    const [page,setPage] = useState(1);
    const [search, setSearch] = useState(' ');
    // useRef 는 화면 렌더링 반영되지 않는 참조값 레퍼런스
    const pageCount = useRef(1);

    const fetchVideo = async() => {
        const response = await fetch(
            `	https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`,
            {
                method : "GET",
                headers : {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`
                }
            }
        );

        const data = await response.json();
        console.log(data);

        pageCount.current = data.meta.pageable_count % 10 > 0 
        ? data.meta.pageable_count / 10 + 1 
        : data.meta.pageable_count / 10 ;
        console.log(pageCount.current);
        pageCount.current = Math.floor(pageCount.current); //정수값으로 바꾸기
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
        setBookList(data.documents);
    }

    const changeSearch = e =>{
        if(e.target.value.length >=2)
            setSearch(e.target.value);
    }

    useEffect(() =>{
        fetchVideo();
    }, [page, search]);
    

    return(
        <>
            <Heading>동영상 검색 목록</Heading>
            <Input type="text" placeholder="검색어 입력" onChange={changeSearch} size="lg" variant="filled"/>
            <div>
                {bookList.map(book =>(
                    <>
                        <p>{book.title}</p>
                    </>
                ))}
            </div>
            <ul>
                {Array.from({length : pageCount.current},(_, index)=>(
                    <>
                        <li onClick={e =>{ setPage(index+1)}}>{index+1}</li>
                    </>
                ))}
            </ul>
        </>
    )
}

export default BookList;