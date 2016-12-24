module.exports = {
    dllPlugin: {
        path: 'node_modules/react-fibook-dlls',
        exclude: [
            "chalk",
            "compression",
            "cross-env",
            "express",
            "ip",
            "minimist",
            "sanitize.css",
        ],
        include: [
            "lodash",
        ]
    }
};
