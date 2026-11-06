# Comands GitHub


# Inicializar el repositorio local
````
git init
````

Referencia del repositorio local con el repositorio remoto (GITHUB)

````
git remote add origin https://github.com/Edvwq/back_nest_angularDA.git
````

# Validar Referencia
````
git remote -v
````
-----------------
````
git add .
git commit -m "Proyecto Base"
git push origin main
````

 -Para Reforzar, forzar subida
````
git push -f origin master
git push -f origin <nombre_de_la_rama>
````

-Generar Tokens
````
 npm i --save@nestjs/jwt passport-jwt bcrypt
````

-Dev indica el ambiente de desarrollo
````
npm i --save-dev@types/passport-jwt
````
# Instalaciones
````
npm i --save @nest/jwt passport-jwt bcrypt
npm i --save-dev @types/passport-jwt
````
# Levantar servidor
````
npm run start:dev
````

# Modules & Sources restapi
````
nest g mo modules/auth
nest g res modules/users
````

# Countroller & Services
````
nest g co modules/auth
nest g s modules/auth
````

# Class Validator
````
 npm i --save class-validator class-transformer
````

# passport
````
npm i @nestjs/passport
````

# variables de entorno
````
DESARROLLO -> DEVELOPMENT
````

# MIGRATION
````
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:generate": "npm run typeorm migration:generate ./src/database/migrations/%npm_config_name% -- -d typeorm.config.ts",
    "migration:run": "npm run typeorm migration:run -- -d typeorm.config.ts"
````


