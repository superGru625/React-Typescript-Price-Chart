export type EnvProps = {
    development: any;
    production: any;
    test: any;
};

export type ConfigProps = {
    isDark: boolean;
    env: EnvProps;
};
