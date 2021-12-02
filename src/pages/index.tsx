import dynamic from 'next/dynamic';
const Pixi = dynamic(() => import('../components/Pixi'), { ssr: false });

const Page = () => {
  return <Pixi />;
};

export default Page;
