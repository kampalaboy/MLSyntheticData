const features ={};

features.getPathCount=(paths)=>{
    return paths.length;
};

features.getPointCount=(paths)=>{
    const points=paths.flat();
    return points.length;
};

features.getWidth=(paths)=>{
    const points=paths.flat();
    const x=points.map(p=>p[0]);
    const min=Math.min(...x);
    const max=Math.max(...x)

        return max-min;
};

features.getHeight=(paths)=>{
    const points=paths.flat();
    const y=points.map(p=>p[1]);
    const min=Math.min(...y);
    const max=Math.max(...y);

        return max-min;
};

features.inUse=[
    {name:"Width", function:features.getWidth},
    {name:"Height", function:features.getHeight}    
];

if(typeof module!=='undefined'){
    module.exports=features;
};