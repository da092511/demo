import React from 'react';
import { Heading,IconButton,useColorMode, useColorModeValue, Icon,HStack } from '@chakra-ui/react';
//import {
//    Breadcrumb,
//    BreadcrumbItem,
//    BreadcrumbLink,
//    } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
        Menu,
        MenuButton,
        MenuList,
        MenuItem,
        MenuItemOption,
        MenuGroup,
        MenuOptionGroup,
        MenuDivider,
    } from '@chakra-ui/react';
import { FaMoon, FaSearch, FaSun } from 'react-icons/fa';

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    const color = useColorModeValue('pink','pink');
    const buttonScheme = useColorModeValue('pink','pink');

    return (
        <>
            <Heading textAlign={"center"} size={"xl"} m={"20px"} color={color}>
                <Icon as={FaSearch} />
                검색 서비스
            </Heading>
            <HStack justifyContent={"space-between"}>
                <HStack>
                    <Menu>
                        <Button as='a' href='/demo' colorScheme='pink' >
                            Home
                        </Button>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} colorScheme='pink'>
                            Video
                        </MenuButton>
                        <MenuList>
                            <MenuItem as='a' href='/demo/video'>추천동영상</MenuItem>
                            <MenuItem as='a' href='/demo/video/list'>동영상 검색</MenuItem>
                            <MenuItem as='a' href='/demo/video/search'>동영상 검색</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} colorScheme='pink' >
                            Book
                        </MenuButton>
                        <MenuList>
                            <MenuItem as='a' href='/demo/book'>추천 도서 목록 페이지</MenuItem>
                            <MenuItem as='a' href='/demo/book/list'>추천 도서 목록 페이지</MenuItem>
                            <MenuItem as='a' href='/demo/book/search'>도서 목록 페이지</MenuItem>
                            <MenuItem as='a' href='/demo/book/search/:isbn'>도서 상세페이지</MenuItem>
                        </MenuList>
                        
                    </Menu>
                </HStack>
                <HStack>
                    {
                        colorMode === "light" ?
                        <IconButton icon = {<FaMoon />} onClick={toggleColorMode} size={"lg"}/> :
                        <IconButton icon = {<FaSun />} onClick={toggleColorMode} size={"lg"}/>
                    }
                </HStack>

            </HStack>
            
            
        </>
    );
};

export default Header;