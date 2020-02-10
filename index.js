const toxy = require('toxy');
const rules = toxy.rules;
const poisons = toxy.poisons;
const proxy = toxy();
const stdio = require('stdio');
const chalk = require('chalk');
const ops = stdio.getopt({
  'port': {
    args: 1,
    description: 'Which port to run the toxy on.',
    required: true
  },
  'dest': {
    args: 1,
    description: 'Destination you want to proxy.',
    required: true
  },
  'latency': {
    args: 1,
    description: 'Destination latency.',
    required: true
  },
});

const log = () => {
  return function reqLog (req, res, next) {
    console.log(`☠ ${ops.dest}${req.url}`);
    next();
  }
}

proxy
  .forward(ops.dest)
  .all('/*')
  .withRule(rules.method(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'UPDATE']))
  .poison(log())
  .poison(poisons.latency({ jitter: ops.latency }));

proxy.listen(ops.port);

console.log(chalk.red(`
           #############
         ##############*##
        ################**#
       ########  #  ####***#
      ########       ###****#
     ##########     ####*****#
     ####   ##### #####   ***#
     ###      #######      **#
     ###   X   #####   X   **#
     ####     ## # ##     ***#
     ########## ### ##*******#
      ### ############**# ###
          ##-#-#-#-#-#-##
           | | | | | | |
`));
console.log(chalk.green(`Toxy Lifted on http://localhost:${ ops.port }/`));
