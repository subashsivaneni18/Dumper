import {  Box, Image, Text } from '@chakra-ui/react';
import { DumpBox } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'


interface DumpCardProps {
  DumpData:DumpBox
}

const DumpCard:React.FC<DumpCardProps> = ({
  DumpData
}) => {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    title: "Modern home in city center in the heart of historic Los Angeles",
  };

  const router = useRouter()



  return (
    <div className="cursor-pointer" onClick={()=>router.push(`/Dumpbox/${DumpData.id}`)} >
      <Box maxW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          className="hover:scale-105 transition"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            ></Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            <Text className='text-xl' fontWeight='light'>{DumpData.name}</Text>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default DumpCard
