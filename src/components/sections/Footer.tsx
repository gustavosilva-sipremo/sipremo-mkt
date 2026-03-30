import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-lg font-semibold">Sipremo</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Tecnologia que prevê o futuro para garantir nosso presente.
        </p>

        <Separator className="my-6" />

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sipremo. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
