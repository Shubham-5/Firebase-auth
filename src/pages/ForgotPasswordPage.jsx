import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function ForgotPasswordPage() {
  const history = useHistory();
  const [email, setemail] = useState("");
  const toast = useToast();
  const { forgotPassword } = useAuth();

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Forgot password
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email) {
              toast({
                description: "Credentials not valid.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }

            forgotPassword(email)
              .then(() => {
                toast({
                  description: "Successfull, Cheack Your Mail",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                toast({
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              });
          }}>
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </FormControl>
            <Button type='submit' colorScheme='primary' size='lg' fontSize='md'>
              Submit
            </Button>
          </Stack>
        </chakra.form>
        <DividerWithText my={6}>OR</DividerWithText>
        <Center>
          <Button variant='link' onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
      </Card>
    </Layout>
  );
}
