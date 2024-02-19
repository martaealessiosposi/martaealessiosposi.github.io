import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto column-6">
      <Image
        src="/images/header.jpg"
        alt="Marta e Alessio sposi"
        width={1280}
        height={400}
      />
    </div>
  );
}
