import dynamic from 'next/dynamic';

const Geometorix = dynamic(() => import('../components/GeometorixBezier'), { ssr: false });

const Page = () => {
  return <Geometorix />;
};

export default Page;
