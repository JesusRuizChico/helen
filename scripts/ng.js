// Ejecuta Angular CLI agregando --openssl-legacy-provider cuando Node es 17 o mas nuevo.
// Angular 7 usa webpack 4, que necesita esa opcion en Node >= 17 (ERR_OSSL_EVP_UNSUPPORTED).
var spawnSync = require('child_process').spawnSync;

var major = parseInt(process.versions.node.split('.')[0], 10);
var env = Object.assign({}, process.env);
if (major >= 17 && (env.NODE_OPTIONS || '').indexOf('--openssl-legacy-provider') === -1) {
  env.NODE_OPTIONS = ((env.NODE_OPTIONS || '') + ' --openssl-legacy-provider').trim();
}

var ng = require.resolve('@angular/cli/bin/ng');
var result = spawnSync(process.execPath, [ng].concat(process.argv.slice(2)), { stdio: 'inherit', env: env });
process.exit(result.status === null ? 1 : result.status);
