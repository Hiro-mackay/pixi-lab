import { Application, Graphics, Container } from 'pixi.js';
import { Viewer } from './Viewer';

const Component = () => {
  const app = new Application({ width: 1240, height: 720, backgroundColor: 0x333333 });

  const shape = new Container();
  shape.position.set(0, 0);
  const bezier = new Graphics();
  bezier.lineStyle(5, 0xaa0000, 1, 0);

  shape.addChild(bezier);

  const base = 50;

  const deltaBezeir = base * 0.552284749831;

  const geoInfo1: geoInfoData = {
    id: '1',
    fBezierX: 0,
    fBezierY: 50 + deltaBezeir,
    PathX: 0,
    PathY: 50,
    rBezierX: 0,
    rBezierY: 50 - deltaBezeir,
    nextGeoID: '2'
  };

  const geoInfo2: geoInfoData = {
    id: '2',
    fBezierX: 50 - deltaBezeir,
    fBezierY: 0,
    PathX: 50,
    PathY: 0,
    rBezierX: 50 + deltaBezeir,
    rBezierY: 0,
    nextGeoID: '3'
  };
  const geoInfo3: geoInfoData = {
    id: '3',
    fBezierX: 100,
    fBezierY: 50 - deltaBezeir,
    PathX: 100,
    PathY: 50,
    rBezierX: 100,
    rBezierY: 50 + deltaBezeir,
    nextGeoID: '4'
  };

  const geoInfo4: geoInfoData = {
    id: '4',
    fBezierX: 50 + deltaBezeir,
    fBezierY: 100,
    PathX: 50,
    PathY: 100,
    rBezierX: 50 - deltaBezeir,
    rBezierY: 100,
    nextGeoID: '1'
  };

  const GeoMap = new Map();

  GeoMap.set(geoInfo1.id, geoInfo1);
  GeoMap.set(geoInfo2.id, geoInfo2);
  GeoMap.set(geoInfo3.id, geoInfo3);
  GeoMap.set(geoInfo4.id, geoInfo4);

  const baseX = geoInfo3.PathX;
  const baseY = geoInfo3.PathY;

  bezier.position.set(geoInfo3.PathX, geoInfo3.PathY);
  let next: geoInfoData = GeoMap.get(geoInfo3.nextGeoID);

  bezier.bezierCurveTo(
    geoInfo3.rBezierX - baseX,
    geoInfo3.rBezierY - baseY,
    next.fBezierX - baseX,
    next.fBezierY - baseY,
    next.PathX - baseX,
    next.PathY - baseY
  );

  let _next: geoInfoData = GeoMap.get(next.nextGeoID);

  bezier.bezierCurveTo(
    next.rBezierX - baseX,
    next.rBezierY - baseY,
    _next.fBezierX - baseX,
    _next.fBezierY - baseY,
    _next.PathX - baseX,
    _next.PathY - baseY
  );

  next = _next;
  _next = GeoMap.get(_next.nextGeoID);

  bezier.bezierCurveTo(
    next.rBezierX - baseX,
    next.rBezierY - baseY,
    _next.fBezierX - baseX,
    _next.fBezierY - baseY,
    _next.PathX - baseX,
    _next.PathY - baseY
  );

  next = _next;
  _next = GeoMap.get(_next.nextGeoID);

  bezier.bezierCurveTo(
    next.rBezierX - baseX,
    next.rBezierY - baseY,
    _next.fBezierX - baseX,
    _next.fBezierY - baseY,
    _next.PathX - baseX,
    _next.PathY - baseY
  );

  app.stage.addChild(shape);

  return <Viewer app={app} />;
};

export default Component;

type geoInfoData = {
  id: string;
  fBezierX: number;
  fBezierY: number;
  PathX: number;
  PathY: number;
  rBezierX: number;
  rBezierY: number;
  nextGeoID: string;
};
