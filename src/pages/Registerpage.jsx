import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Badge,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import useMount from "../mount/useMounted";

function Registerpage() {
  const history = useHistory();
  const toast = useToast();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState("");
  const mounted = useMount();
  const { register } = useAuth();
  const location = useLocation();
  function handleRedirectToOrBack() {
    history.replace(location.state?.from ?? "/login");
  }

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Register
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();

            //checking if user email or password is not valid format then show alert
            if (!registerEmail || !registerPassword) {
              toast({
                description: "Credentials not valid.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }

            //calling register function from useAuth and passed value
            //to create user account
            setIsSubmitting(true);
            register(registerEmail, registerPassword)
              .then(handleRedirectToOrBack)
              .catch((error) => {
                console.log(error.message);
                toast({
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              })
              .finally(() => mounted.current && setIsSubmitting(false));
          }}>
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                required
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                type='password'
                autoComplete='password'
                required
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type='submit'
              colorScheme='primary'
              size='lg'
              fontSize='md'>
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant='link' onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
      </Card>
      <DividerWithText my={10}>
        <Badge>Shubham Rajput</Badge>
      </DividerWithText>
    </Layout>
  );
}

export default Registerpage;
