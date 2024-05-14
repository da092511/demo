//JSX
// ㄴ Javascript

import {React, useEffect, useRef, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { GoVideo } from "react-icons/go";
import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import {
    Icon,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    useColorMode,
    useColorModeValue,
    Text
    } from '@chakra-ui/react';
import { FaBook } from "react-icons/fa";

const BookList = () =>{
    // useState 는 화면 렌더링에 반영됨
    const [bookList,setBookList] = useState([]); //[]빈 배열
    const [page,setPage] = useState(1);
    const [search, setSearch] = useState('달고나');
    // useRef 는 화면 렌더링 반영되지 않는 참조값 레퍼런스
    const pageCount = useRef(1);

    const color = useColorModeValue('pink','pink');
    const buttonScheme = useColorModeValue('yellow','yellow');

    const fetchBook = async() => {
        const response = await fetch(
            `	https://dapi.kakao.com/v3/search/book?query=${search}&page=${page}`,
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
        fetchBook();
    }, [page, search]);
    

    return(
        <>
            <Box>
                
                <Heading color={color} textAlign={"center"} m={"20px"} mb={'50px'}>
                    <Icon as={FaBook} boxSize={"1.2em"} mr={'10px'} pt={'10px'}/>도서 검색 목록
                </Heading>
                
                
            <Input type="text" placeholder="검색어 입력" onChange={changeSearch} size="lg" variant="filled"/>
            <TableContainer>
                <Table variant={"striped"} colorScheme="pink">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Title</Th>
                            <Th>Author</Th>
                            <Th>Publisher</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookList.map((book,index)=>(
                            <>
                                <Tr>
                                    <Td>{(page - 1)* 10 + index +1}</Td>
                                    <Td>
                                        <a href={book.url}>{book.title}</a>
                                    </Td>
                                    <Td>{book.authors.length === 0 ? "저자미상" : book.authors }</Td>
                                    <Td>{book.publisher}</Td>
                                </Tr>
                            </>
                        ))}
                    </Tbody>
                    <Tfoot></Tfoot>
                </Table>
            </TableContainer>
            
            <HStack>
                {Array.from({length : pageCount.current},(_, index)=>(
                    <>
                        <Button 
                            colorScheme={
                                page === index +1 ? "pink" : buttonScheme}
                            onClick={(e) =>{
                                setPage(index +1);
                            }}
                        >
                            {index +1}
                        </Button>
                    </>
                ))}
            
            </HStack>
            </Box>
            
        </>
    )
}

export default BookList;