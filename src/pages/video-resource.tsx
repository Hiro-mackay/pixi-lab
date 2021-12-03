import dynamic from 'next/dynamic';
const VideoResource = dynamic(() => import('../components/VideoResource'), { ssr: false });

const Page = () => {
  return <VideoResource />;
};

export default Page;
