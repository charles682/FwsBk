"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf } from "../helpers/cpf";

const formShema = z.object({
  // trim nao caeita espaco em branco
  name: z.string().trim().min(1, {
    message: "Campo obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatorio",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
});

type FormShema = z.infer<typeof formShema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const form = useForm<FormShema>({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = (data: FormShema) => {
    console.log(data);
  };
  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Finalizar Pedido</DrawerTitle>
            <DrawerDescription>
              Insira suas informações abaixo para finalizar o seu pedido.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-5 py-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu cpf</FormLabel>
                      <FormControl>
                        <PatternFormat
                          placeholder="Digite seu CPF..."
                          format="###.###.###-##"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="rounded-lg"
                   
                  >
                    Finalizar
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="secondary"  className="rounded-lg">
                      Cancelar
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </DrawerContent>
        
      </Drawer>
    </>
  );
};

export default FinishOrderDialog;
