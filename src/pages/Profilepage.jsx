import React from "react";
import { Layout } from "../components/Layout";
import { Badge, Container, Heading } from "@chakra-ui/react";

import { useAuth } from "../context/AuthContext";

export default function Profilepage() {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <Heading>
        Profile page
        <Badge colorScheme='green' fontSize='lg' mx={4}>
          Protected Page
        </Badge>
      </Heading>

      <Container maxW='container.lg' py={4}>
        <Heading fontSize='md' my={6}>
          Email :
        </Heading>
        <Badge>{currentUser.email}</Badge>
        <Heading fontSize='md' my={6}>
          Last Signin Time :
        </Heading>
        <Badge>{currentUser.metadata.lastSignInTime}</Badge>
      </Container>
    </Layout>
  );
}
