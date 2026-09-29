const defaultConfig=({
     serverPort:Number(process.env.PORT || 5000),
     serverUrl:process.env.SERVER_URL ||"http://localhost:5000",
     jwtSecret: process.env.JWT_SECRET || "thahseen2004",
    postgresDb: {
        db:process.env.DB_USERNAME ||"postgres",
        dbPort:Number( process.env.DB_PORT || 5432),
        dbName:process.env.DB_NAME ||"user_db",
        dbHost:process.env.DB_HOST ||"localhost",
        dbPassword:process.env.DB_PASSWORD ||"thahseen10"
    },

    email: {
        user:process.env.EMAIL_USER ||"thahseenfathima16@gmail.com",
        password:process.env.EMAIL_PASSWORD ||"nklp ewyc biog celc",

        service:process.env.EMAIL_SERVICE ||"gmail"
    },

    mobileAppLink:process.env.MOBILE_APP_LINK ||"http://localhost:3000"
});
export default defaultConfig;