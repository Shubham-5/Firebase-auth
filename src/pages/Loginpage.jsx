import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Badge,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { Link, useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";

import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import useMounted from "../mount/useMounted";

export default function Loginpage() {
  console.log(process.env.REACT_APP_API_KEY);
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function handleRedirectToOrBack() {
    history.replace(location.state?.from ?? "/profile");
  }

  const mounted = useMounted();

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Login
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!loginEmail || !loginPassword) {
              toast({
                description: "Credentials not valid.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }

            setIsSubmitting(true);

            login(loginEmail, loginPassword)
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
                value={loginEmail}
                type='email'
                autoComplete='email'
                required
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                value={loginPassword}
                type='password'
                autoComplete='password'
                required
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              type='submit'
              colorScheme='primary'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}>
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent='space-between' my={4}>
          <Button variant='link'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </Button>
          <Button variant='link' onClick={() => history.push("/register")}>
            Register
          </Button>
        </HStack>
      </Card>
      <DividerWithText my={10}>
        <Badge>Shubham Rajput</Badge>
      </DividerWithText>
    </Layout>
  );
}
