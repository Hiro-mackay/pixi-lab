import dynamic from 'next/dynamic';
const VideoResource = dynamic(() => import('../components/Encoder'), { ssr: false });

const Page = () => {
  return <VideoResource />;
};

export default Page;
