import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegistrationForm = (props) => {
  const [submit, setSubmit] = useState(false);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/members/1")
      .then((response) => {
        console.log(response.data);
        setId(response.data.id);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setAge(response.data.age);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [submit]);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    setSubmit(true);
    console.log(data);
    const id = data.id;
    axios
      .put(`http://localhost:3001/members/${id}`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //console.log(watch("firstName")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        name="id"
        placeholder="id"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        ref={register({ required: true })}
      />
      {errors.id && <span style={{ color: "red" }}>id is required</span>}
      <br />
      <input
        name="firstName"
        placeholder="firstname"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        ref={register({ required: true, maxLength: 20 })}
      />
      {errors.firstName && (
        <span style={{ color: "red" }}>This field is required</span>
      )}
      <br />
      <input
        name="lastName"
        placeholder="lastname"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        ref={register({ pattern: /^[A-Za-z]+$/i })}
      />
      {errors.lastName && <span style={{ color: "red" }}>error occured</span>}
      <br />
      <input
        name="age"
        type="number"
        placeholder="age"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
        ref={register({ min: 18, max: 99 })}
      />
      {errors.age && <span style={{ color: "red" }}>error ocuured</span>}
      <br />
      <input type="submit" />
    </form>
  );
};

export default RegistrationForm;
