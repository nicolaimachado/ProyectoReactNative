import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import {
  useNavigation,
} from '@react-navigation/native';
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { useState } from "react";
import { Heading } from "@/components/ui/heading";

import React from "react";

function AltaScreen() {
  const navigation = useNavigation();

  const [datos, setDatos] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    emailCliente: "",
    telefonoCliente: "",
  });

  const [datosValidos, setDatosValidos] = useState({
    nombreCliente: false, // true si hay error
    apellidoCliente: false,
    emailCliente: false,
    telefonoCliente: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    // Enviamos los datos mediante fetch
    if (validarDatos()){
      try{
        const response = await fetch("http://localhost:3000/api/clientes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          });

        if (response.ok) {
            const respuesta = await response.json();
            alert(respuesta.mensaje);
            if(respuesta.ok){
                navigation.goBack(); // Volver a la página principal
            }  
        } 
    } catch (error) {
      console.error("Error:", error);
      alert("Error:" + error);
    }
    }
  };

  function validarDatos() {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // En principio, damos por bueno el formulario
    let nombreClienteValido = true; // true si es valido
    let apellidoClienteValido = true;
    let emailClienteValido = true;
    let telefonoClienteValido = true;

    if (datos.nombreCliente == null || datos.nombreCliente.length < 3 || datos.nombreCliente.length > 100 || datos.nombreCliente == "") {
        nombreClienteValido = false;
    }

    if (datos.apellidoCliente == null || datos.apellidoCliente.length < 3 || datos.apellidoCliente.length > 100 || datos.apellidoCliente == "") {
        apellidoClienteValido = false;
    }

    if (datos.emailCliente == null || datos.emailCliente.length < 3 || datos.emailCliente.length > 100 || datos.emailCliente == "" || regex.test(datos.emailCliente) == false) {
        emailClienteValido = false;
    }

    if (datos.telefonoCliente == null || datos.telefonoCliente.length != 9 || datos.telefonoCliente == "") {
        telefonoClienteValido = false;
    }

    // Actualizo el estado de la validacion de los Textfields
    setDatosValidos({
        nombreCliente: nombreClienteValido,
        apellidoCliente: apellidoClienteValido,
        emailCliente: emailClienteValido,
        telefonoCliente: telefonoClienteValido,
    });

    return nombreClienteValido && apellidoClienteValido && emailClienteValido && telefonoClienteValido;
}

  return (
    <>
    <Heading size="lg" className="text-center font-bold mb-4">
      Listado de Clientes
      </Heading>
    <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4 justify-center">
      <FormControl
        isInvalid={submitted && !datosValidos.nombreCliente}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Nombre</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Nombre del cliente"
            value={datos.nombreCliente}
            onChangeText={(text) => setDatos({ ...datos, nombreCliente: text })}
          />
        </Input>

        {submitted && !datosValidos.nombreCliente && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              El nombre del plato es obligatorio
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isInvalid={submitted && !datosValidos.apellidoCliente}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Apellido</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Apellido del cliente"
            value={datos.apellidoCliente}
            onChangeText={(text) => setDatos({ ...datos, apellidoCliente: text })}
          />
        </Input>

        {submitted && !datosValidos.apellidoCliente && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              El apellido del cliente es obligatorio (Min. 3 caracteres)
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isInvalid={submitted && !datosValidos.emailCliente}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Correo</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Correo"
            value={datos.emailCliente}
            onChangeText={(text) => setDatos({ ...datos, emailCliente: text })}
          />
        </Input>

        {submitted && !datosValidos.emailCliente && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              El correo introducido es incorrecto
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isInvalid={submitted && !datosValidos.telefonoCliente}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Telefono</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Telefono"
            value={datos.telefonoCliente}
            onChangeText={(text) => setDatos({ ...datos, telefonoCliente: text })}
          />
        </Input>

        {submitted && !datosValidos.telefonoCliente && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>El telefono debe ser minimo 9 caracteres</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
        <ButtonText>Aceptar</ButtonText>
      </Button>
    </VStack>
    </>
  );
}

export default AltaScreen;