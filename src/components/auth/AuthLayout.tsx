import Icon from "../ui/icon";
import Text from "../ui/text";
import Footer from "../layout/footer";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  backButton?: ReactNode;
}

const AuthLayout = ({ title, subtitle, children, backButton }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center bg-background-light min-h-screen p-4 sm:p-8">
      <main className="relative z-10 w-full max-w-md">
        {/* <!-- Branding Header --> */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-secondary-container rounded-full mb-4">
            <div className="flex items-center justify-center w-14 h-14 bg-primary-dark rounded-lg shadow-md shadow-black/20">
              <Icon name="Wrench" className="text-white text-4xl" />
            </div>
          </div>
          <Text
            as="h1"
            size="xl2"
            fontWeight="bold"
            color="text-primary"
            align="center"
          >
            Admin Reparaciones
          </Text>
        </div>
        {/* <!-- Auth Card --> */}
        <div className="bg-white rounded-xl shadow-[0_32px_64px_-12px_rgba(0,106,97,0.08)] p-8 sm:p-10 transition-all duration-300">
          <div className="flex flex-col gap-2 mb-8">
            {backButton && (
              <div className="flex items-start justify-between">
                {backButton}
              </div>
            )}
            <Text
              as="span"
              size="lg"
              fontWeight="bold"
              color="text-zinc-900"
              align="left"
            >
              {title}
            </Text>
            <Text
              as="span"
              size="md"
              fontWeight="semibold"
              color="text-zinc-500"
              align="left"
            >
              {subtitle}
            </Text>
          </div>
          {children}
        </div>
        {/* <!-- System Footer --> */}
        <Footer
          align="center"
          textLabel={
            "© " +
            new Date().getFullYear() +
            " Technical Repair Administration. Todos los derechos reservados."
          }
        />
      </main>
    </div>
  );
};

export default AuthLayout;
