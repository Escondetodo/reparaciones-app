import Icon from "../icon";
import Text from "../text";
import RegisterForm from "../customForm/RegisterForm";
import Footer from "./footer";

const Login = () => {
  return (
    <div className="flex items-center justify-center bg-background-light min-h-screen p-4 sm:p-8">
      {/* <!-- Background Pattern Decoration --> */}
      {/* <!-- Login Container --> */}
      <main className="relative z-10 w-full max-w-md">
        {/* <!-- Branding Header --> */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-secondary-container rounded-full mb-4">
            <div className="flex items-center justify-center w-14 h-14 bg-[#00685f] rounded-lg shadow-md shadow-black/20">
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
        {/* <!-- Login Card --> */}
        <div className="bg-white rounded-xl shadow-[0_32px_64px_-12px_rgba(0,106,97,0.08)] p-8 sm:p-10 transition-all duration-300">
          <div className="mb-8">
            <Text
              as="span"
              size="lg"
              fontWeight="bold"
              color="text-zinc-900"
              align="left"
            >
              ¡Bienvenido de nuevo, técnico!
            </Text>
            <Text
              as="span"
              size="md"
              fontWeight="semibold"
              color="text-zinc-500"
              align="left"
            >
              Accede al panel de control técnico
            </Text>
          </div>
          <RegisterForm />
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

export default Login;
