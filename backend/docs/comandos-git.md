# Documentación de comandos (desde cero)

Guía en orden desde la creación del proyecto hasta la subida a GitHub, integrando comandos de las diapositivas (clases 7–11) y los puntos clave de migraciones en Windows/Mac.

## Correcciones rápidas (errores típicos)

- `git add . p` → el comando correcto es `git add .`
- `git commit –m` → el comando correcto es `git commit -m`
- `@nest/jwt` → el paquete correcto es `@nestjs/jwt`
- `npm i --save@nestjs/jwt ...` → debe llevar espacio: `npm i --save @nestjs/jwt ...`
- `npm i --save-dev@types/passport-jwt` → debe llevar espacio: `npm i --save-dev @types/passport-jwt`

---

## 0) Crear el proyecto NestJS (inicio)

Nota: estos comandos son los estándar para crear un proyecto NestJS. En las diapositivas que compartiste, el flujo empieza cuando el proyecto ya existe y se inicializa Git.

### Instalar Nest CLI (si no está instalado)

```bash
npm i -g @nestjs/cli
```

### Crear proyecto

```bash
nest new back_nest_angular
```

Entrar al proyecto:

```bash
cd back_nest_angular
```

Abrir en VS Code (opcional):

```bash
code .
```

### Levantar servidor en desarrollo

```bash
npm run start:dev
```

---

## 1) Inicializar Git y subir a GitHub

### Inicializar repositorio local (diapositivas)

```bash
git init
```

### Crear el repositorio en GitHub

1. Crea un repositorio vacío en GitHub (sin README si ya tienes archivos).
2. Copia la URL HTTPS del repo.

### Conectar repositorio local con el remoto (diapositivas)

Formato general:

```bash
git remote add origin https://github.com/USUARIO/NOMBRE_REPOSITORIO.git
```

Ejemplos vistos en el material:

```bash
git remote add origin https://github.com/Edvwq/back_nest_angularDA.git
git remote add origin https://github.com/RPaezA/back_nest_angular.git
```

### Verificar referencia remota (diapositivas)

```bash
git remote -v
```

### Primera subida (commit + push)

```bash
git add .
git commit -m "Proyecto base"
git push origin main
```

Si tu repo usa `master`:

```bash
git push origin master
```

### Forzar subida (solo si es necesario)

```bash
git push -f origin master
git push -f origin <nombre_de_la_rama>
```

### Flujo que más se repite en el proyecto

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

---

## 2) Generación de módulos, recursos, controladores y servicios (NestJS)

### Módulo de autenticación (diapositivas)

```bash
nest g mo modules/auth
```

### CRUD de usuarios (diapositivas)

```bash
nest g res modules/users
```

### Controlador y servicio de auth (diapositivas)

```bash
nest g co modules/auth
nest g s modules/auth
```

### Módulo/servicio de configuración (diapositivas mencionan el servicio)

```bash
nest g mo config
nest g s config
```

### Patrón para crear nuevos recursos (clases posteriores)

```bash
nest g res modules/categoria
nest g res modules/persona
nest g res modules/producto
```

---

## 3) Instalaciones para JWT + Passport + bcrypt

### Paquetes principales (diapositivas)

```bash
npm i --save @nestjs/jwt passport-jwt bcrypt
```

### Tipos en desarrollo (diapositivas)

```bash
npm i --save-dev @types/passport-jwt
```

### Passport para NestJS (diapositivas)

```bash
npm i @nestjs/passport
```

---

## 4) Validaciones con DTO (class-validator)

```bash
npm i --save class-validator class-transformer
```

---

## 5) Variables de entorno (dotenv / NODE_ENV)

### Archivos recomendados (diapositivas)

```bash
.env.development
.env.production
```

### Instalar dotenv (diapositivas)

```bash
npm i dotenv
```

### Instalar cross-env (para setear NODE_ENV desde scripts)

```bash
npm i --save-dev cross-env
```

### Probar variables desde Node (diapositivas)

Entrar a Node:

```bash
node
```

Consultar:

```js
process.env.NODE_ENV
```

---

## 6) TypeORM y migraciones

En las diapositivas se crea el archivo de configuración:

```bash
typeorm.config.ts
```

### Scripts recomendados en package.json (punto vital Windows vs Mac)

Este bloque es CLAVE para que `migration:generate` funcione en ambos sistemas:

```json
{
  "scripts": {
    "typeorm": "typeorm-ts-node-commonjs",
    "migration:generate:win": "npm run typeorm migration:generate ./src/database/migrations/%npm_config_name% -- -d typeorm.config.ts",
    "migration:generate:mac": "npm run typeorm migration:generate ./src/database/migrations/$npm_config_name -- -d typeorm.config.ts",
    "migration:run": "npm run typeorm migration:run -- -d typeorm.config.ts",
    "migration:revert": "npm run typeorm migration:revert -- -d typeorm.config.ts"
  }
}
```

### Por qué cambia

- Windows usa `%npm_config_name%`
- Mac/Linux usa `$npm_config_name`

### Generar migración

Windows:

```bash
npm run migration:generate:win --name=CreateUserTable
```

Mac:

```bash
npm run migration:generate:mac --name=CreateUserTable
```

### Ejecutar migraciones

```bash
npm run migration:run
```

### Revertir migraciones

```bash
npm run migration:revert
```

### Idea clave de clase

- Si no cambias la entidad, no se genera una migración nueva.
- `migration:revert` se puede ejecutar varias veces para “volver atrás” en pasos.

---

## 7) Secuencia completa recomendada (crear → subir)

```bash
# 1) Crear proyecto
npm i -g @nestjs/cli
nest new back_nest_angular
cd back_nest_angular

# 2) Levantar servidor
npm run start:dev

# 3) Inicializar Git
git init

# 4) Conectar remoto y verificar
git remote add origin https://github.com/USUARIO/NOMBRE_REPOSITORIO.git
git remote -v

# 5) Primera subida
git add .
git commit -m "Proyecto base"
git push origin main

# 6) Crear estructura Nest (según clases)
nest g mo modules/auth
nest g res modules/users
nest g co modules/auth
nest g s modules/auth

# 7) Instalar paquetes auth + validaciones
npm i --save @nestjs/jwt passport-jwt bcrypt
npm i --save-dev @types/passport-jwt
npm i @nestjs/passport
npm i --save class-validator class-transformer

# 8) Variables de entorno
npm i dotenv
npm i --save-dev cross-env

# 9) Migraciones (según tu sistema operativo)
npm run migration:generate:mac --name=CreateUserTable   # Mac
npm run migration:generate:win --name=CreateUserTable   # Windows
npm run migration:run

# 10) Subir avances
git add .
git commit -m "Auth + env + migraciones"
git push origin main
```

