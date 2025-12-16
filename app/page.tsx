import ContactForm from "@/components/contactForm";
import Info from "@/components/Info";

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 flex items-center justify-center">
      <div className="w-full max-w-7xl  rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col-reverse xl:flex-row">
          {/* // left part  */}
          <Info />

          {/* // right part  */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
