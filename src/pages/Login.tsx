import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link, VStack, Text, Button } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { PasswordInputFormik } from "../components/PasswordInputFormik";
import { TextInputFormik } from "../components/TextInputFormik";
import { useAuth } from "../hooks/useAuth";
import { typeOrientationAuthAnimation } from "../interfaces/AnimatedAuth";

export function Login({
  orientation,
}: {
  orientation: typeOrientationAuthAnimation;
}) {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email is invalid!")
      .required("Email is required!")
      .strict(true),

    password: yup
      .string()
      .min(8, "Password is too short!")
      .max(16, "Password is too long!")
      .matches(/^(\S+$)/g, "Password is invalid!")
      .required("Password is required!")
      .strict(true),
  });

  function loginHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    if (email != null && password != null) {
      const loginInfo = {
        email,
        password,
      };
      userLogin(loginInfo)
        .then(() => {
          navigate("/profile");
        })
        .catch((error: any) => {
          setFormError(error?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          loginHandler(values);
        }}
        validationSchema={validationSchema}
        initialErrors={{ email: "", password: "" }}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <>
            <Heading height="60px">Login</Heading>
            <form onSubmit={handleSubmit}>
              <VStack width="full" spacing={8}>
                <TextInputFormik name="email" placeholder="Email" />
                <Flex width="full" flexDirection="column">
                  <PasswordInputFormik name="password" placeholder="Password" />
                  <Flex
                    width="full"
                    height="22px"
                    align="flex-end"
                    justify="end"
                  >
                    <Text fontSize="xs" zIndex="2">
                      <Link
                        as={NavLink}
                        to={{ pathname: "/recover" }}
                        state={{ orientation }}
                      >
                        Forgot your password?
                      </Link>
                    </Text>
                  </Flex>
                </Flex>
                <Button
                  colorScheme="blue"
                  width="full"
                  rightIcon={<ArrowForwardIcon />}
                  type="submit"
                  isDisabled={!(isValid && dirty)}
                  isLoading={isLoading}
                >
                  Login
                </Button>
                <Flex
                  width="full"
                  height="20px"
                  align="center"
                  justify="center"
                >
                  <Text fontSize="sm" color="red.500">
                    {formError}
                  </Text>
                </Flex>
              </VStack>
            </form>
          </>
        )}
      </Formik>
    </>
  );
}
