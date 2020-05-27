publicAPI.createSurface = () => {
    const activeView = GlobalObjects.MultiView.getActiveView();
    let nousetem = 0;
    if (!activeView || activeView.getOrientation() === 3) return;
    if (model.contourWidget) {
      // not the image coor;
      const polydata = model.contourWidget
        .getWidgetRep()
        .getContourRepresentationAsPolyData();
      const polydata1 = vtkPolyData.newInstance();
      model.contourWidget
        .getWidgetRep()
        .getNodePolyData(polydata1);
      if (polydata) {
        const points = polydata1.getPoints();
        if (points && points.getNumberOfPoints() > 1) {
          const idx = activeView.GetSliceIndex();
          let range1;
          let range2;
          activeView.getSliceRange(range1, range2);
          let index = 0;
          let flag = false;
          const data = vtkPolyData.newInstance();
          const data1 = vtkPolyData.newInstance();
          if (model.mvFlag.length() !== range2 - range1 + 1) {
            model.mvFlag = [];
          }
          for (let i = range1; i <= range2; i++) {
            if (model.mvFlag.length() === 0) {
              flag = true;
            }
            if (flag === true) {
              if (i === range1 || i === idx || i === range2) {
                model.mvFlag.push(true);
              } else {
                model.mvFlag.push(false);
              }
              data.deepCopy(polydata);
              model.mMapCournter[index] = data;
              data1.deepCopy(polydata1);
              model.mMapCournterNode[index] = data1;
            } else {
              if (i === range1 || i === idx || i === range2) {
                model.mvFlag[i] = true;
                data.deepCopy(polydata);
                model.mMapCournter[index] = data;
                data1.deepCopy(polydata1);
                model.mMapCournterNode[index] = data1;
              } else {
                nousetem = 1;
              }
            }
            index++;
          }
        }
      }
    }
    publicAPI.generateContour
