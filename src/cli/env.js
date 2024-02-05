const parseEnv = () => {
    const envs = Object.entries(process.env)
        .filter(env => env[0].includes('RSS_'))
        .map(env => `${env[0]}=${env[1]}`)
    console.log(envs.join('; '))
};

parseEnv();