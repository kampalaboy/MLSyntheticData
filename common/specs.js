const features = {};

features.calculateAngle = (point1, point2, point3) => {
    const vector = (p1, p2) => [p1[0] - p2[0], p1[1] - p2[1]];
    const dotProduct = (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1];
    const magnitude = v => Math.sqrt(v[0] ** 2 + v[1] ** 2);

    const vector1 = vector(point1, point2);
    const vector2 = vector(point3, point2);

    const cosTheta = dotProduct(vector1, vector2) / (magnitude(vector1) * magnitude(vector2));

    const theta = Math.acos(Math.min(1, Math.max(-1, cosTheta)));
    return (theta * 180) / Math.PI;
};

features.getAngle = (paths) => {
    const calculateAverageAngle = (path) => {
        const angles = [];
        for (let i = 1; i < path.length - 1; i++) {
            angles.push(features.calculateAngle(path[i - 1], path[i], path[i + 1]));
        }
        const sum = angles.reduce((acc, angle) => acc + angle, 0);
        return angles.length > 0 ? sum / angles.length : 0;
    };

    const validPaths = paths.filter(path => path.every(point => point.every(coord => coord !== null)));

    const averageAngles = validPaths.map(calculateAverageAngle);
    const overallAverageAngle = averageAngles.reduce((acc, angle) => acc + angle, 0) / averageAngles.length;

    return overallAverageAngle;
};

features.calculateCurvature = (x1, y1, x2, y2, x3, y3) => {
    const dx1 = x2 - x1;
    const dy1 = y2 - y1;
    const dx2 = x3 - x2;
    const dy2 = y3 - y2;

    const x1Squared = dx1 * dx1;
    const y1Squared = dy1 * dy1;
    const x2Squared = dx2 * dx2;
    const y2Squared = dy2 * dy2;

    const numerator = Math.abs(x1 * y2Squared + x2 * y1Squared + x3 * y1Squared - x1 * y1Squared - x2 * y1Squared - x3 * y2Squared);
    const denominator = Math.pow(x1Squared + y1Squared, 1.5);

    return numerator / denominator;
};

features.getShape = (paths) => {
    const curvatureScore = features.calculateCurvature(paths);
    const angleScore = features.getAngle(paths);

    const curvatureWeight = 0.7;
    const angleWeight = 0.3;

    const combinedScore = (curvatureScore * curvatureWeight) + (angleScore * angleWeight);

    return combinedScore;
};

features.inUse = [
    { name: "Angles", function: features.getAngle },
    { name: "Shape", function: features.getShape }
];

if (typeof module !== 'undefined') {
    module.exports = features;
};
