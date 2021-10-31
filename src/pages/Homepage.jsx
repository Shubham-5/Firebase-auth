import {
  Badge,
  Code,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";

export default function Homepage() {
  return (
    <Layout>
      <Heading>
        <Badge fontWeight='black' fontSize='4xl' colorScheme='black'>
          HOME
        </Badge>
      </Heading>
      <Text my={6}></Text>

      <Heading>Firebase Authentication</Heading>
      <OrderedList fontSize='3xl' my={4}>
        <ListItem>Email password authentication (Register/Login)</ListItem>

        <ListItem>Forgot Password</ListItem>

        <ListItem>Protected routes</ListItem>
        <ListItem>
          <Code fontSize='inherit'> Redirect TO</Code> or Back (keeping the
          state)
        </ListItem>
        <ListItem>
          custom Auth Hook <Code fontSize='3xl'>useAuth()</Code>
        </ListItem>
        <ListItem>Loading indicators while sign-in/up</ListItem>
        <ListItem>
          Dark Mode enabled template using
          <Badge
            fontSize='inherit'
            colorScheme='teal'
            mx={2}
            textTransform='capitalize'
            borderRadius='md'>
            Chakra UI
          </Badge>
        </ListItem>
      </OrderedList>

      <DividerWithText my={10}>
        <Badge>Shubham Rajput</Badge>
      </DividerWithText>
    </Layout>
  );
}
