import React, {useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Inputs, login, selectIsAuth} from "../model/authSlice";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import s from "./Login.module.css"
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {useNavigate} from "react-router";

export const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm<Inputs>()

    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate();

    useEffect(() => {
        isAuth && navigate('/')
    }, [isAuth])

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(login(data));
        reset()
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To login get registered
                            <a
                                style={{marginLeft: "5px"}}
                                href={"https://social-network.samuraijs.com/"}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Incorrect email address",
                                    },
                                })}
                            />
                            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Password must be at least 3 characters long",
                                    },
                                })}
                            />
                            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Controller
                                        name={"rememberMe"}
                                        control={control}
                                        render={({field: {value, ...field}}) => <Checkbox {...field} checked={value}/>}
                                    />
                                }
                            />
                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
}