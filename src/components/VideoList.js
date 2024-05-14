//JSX
// ㄴ Javascript

import {React, useEffect, useRef, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { GoVideo } from "react-icons/go";
import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
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
    useColorModeValue
    } from '@chakra-ui/react';
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';

const VideoList = () =>{
    // useState 는 화면 렌더링에 반영됨
    const [bookList,setBookList] = useState([]); //[]빈 배열
    const [page,setPage] = useState(1);
    const [search, setSearch] = useState('달고나');
    // useRef 는 화면 렌더링 반영되지 않는 참조값 레퍼런스
    const pageCount = useRef(1);

    const color = useColorModeValue('pink','pink');
    const buttonScheme = useColorModeValue('pink','pink');

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
            <Box>
                <Heading color={color} textAlign={"center"} m={"20px"} mb={'50px'}>
                    <Icon as={GoVideo} boxSize={"1em"} mr={'20px'} />동영상 검색 목록
                </Heading>
                
            <Input type="text" placeholder="검색어 입력" onChange={changeSearch} size="lg" variant="filled"/>
            <TableContainer>
                <Table variant={"striped"} colorScheme="pink">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Thumbnail</Th>
                            <Th>Title</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookList.map((video,index)=>(
                            <>
                                <Tr>
                                    <Td>{(page - 1)* 10 + index +1}</Td>
                                        <Td><img src={video.thumbnail} w='300px' h='300px'></img></Td>
                                        <Td>
                                            <a>{video.title}</a>
                                        </Td>

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
                                page === index +1 ? "red" : buttonScheme}
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

export default VideoList;