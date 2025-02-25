import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Icon, ArrowRightIcon } from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from 'react-native';
export function ListadoScreen() {
  interface Cliente {
    idCliente: number;
    nombreCliente: string;
    apellidoCliente: string;
    emailCliente: string;
    telefonoCliente: number;
  }

  const [datos, setDatos] = useState<Cliente[]>([]);

   useEffect(() => {
    async function getClientes() {
      let response = await fetch("http://localhost:3000/api/clientes");

      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    }

    getClientes();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (idCliente: number) => {
    let response = await fetch("http://localhost:3000/api/clientes/" + idCliente, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const clientesTrasBorrado = datos.filter(cli => cli.idCliente !== idCliente);
      // Establece los datos de nuevo para provocar un renderizado
      setDatos(clientesTrasBorrado);
    }
  };

  return (
    <>
      <ScrollView>
      <Heading size="lg" className="text-center font-bold mb-4">
      Listado de Clientes
      </Heading>
        {datos.map((cli) => (
          <Card key={cli.idCliente} className="p-5 rounded-lg max-w-[360px] m-3">
            {/* <Image
            source={{
              uri: "https://gluestack.github.io/public-blog-video-assets/yoga.png",
            }}
            className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
            alt="image"
          /> */}
            <Text className="text-sm font-normal mb-2 text-typography-700">
              Cliente {cli.idCliente}
            </Text>
            <Heading size="md" className="mb-4">
              {cli.nombreCliente + " " + cli.apellidoCliente}
            </Heading>
            <Text className="text-sm font-normal mb-2 text-typography-700">
              {cli.emailCliente + " | " + cli.telefonoCliente}
            </Text>
            <Link href="#" onPress={() => handleDelete(cli.idCliente)}>
              <HStack className="items-center">
                <LinkText
                  size="sm"
                  className="font-semibold text-info-600 no-underline"
                >
                  Borrar
                </LinkText>
                <Icon
                  as={ArrowRightIcon}
                  size="sm"
                  className="text-info-600 mt-0.5 ml-0.5"
                />
              </HStack>
            </Link>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}