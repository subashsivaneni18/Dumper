"use client"
import React, { useCallback } from 'react'
import { Card,  CardBody, CardFooter,  Avatar, Badge, List, ListItem, useToast } from "@chakra-ui/react";
import { User } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';


interface UserCardProps{
    user:User
    boxId:string
}

const UserCard:React.FC<UserCardProps> = ({
    user,
    boxId
}) => {

  const toast = useToast()

  const handleDelete = useCallback(async()=>{
    try {
      await axios.patch(`/api/acess/${boxId}`,{id:user.id})
      toast({
        title: "Deleted Sucessfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to delete",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  },[toast,boxId,user?.id])


  const handleAcessChange = useCallback(async()=>{
      try {
        await axios.patch(`/api/AdminControl/${boxId}`,{userId:user?.id})
        toast({
          title: "Acess Changed Sucessfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error)
      }
  },[toast,boxId,user?.id])

  const {data:parentId} = useSWR(`/api/parent/${boxId}`,fetcher)

  

  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        size="xs"
        className="p-3 flex gap-16 items-center w-[500px] h-fit -space-y-2 rounded-xl"
      >
        <Avatar
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          size="lg"
        />

        <div className=" space-y-4 flex items-center gap-5">
          <CardBody>
            <p className="text-lg">{user?.username}</p>
          </CardBody>

          <CardFooter className="flex gap-3">
            {user.isAdmin ? (
              <div>
                <Badge colorScheme="green">Admin</Badge>
              </div>
            ) : (
              <div>
                <Badge>Member</Badge>
              </div>
            )}
          </CardFooter>
        </div>

        {(user.isAdmin === true && user.id == parentId) ? (
          <div></div>
        ) : (
          <div>
            <p className="cursor-pointer" onClick={() => handleDelete()}>
              Delete User
            </p>
            <p className="cursor-pointer" onClick={() => handleAcessChange()}>
              Change Acess
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default UserCard
