const toxy = require('toxy');
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

proxy
  .forward(ops.dest)
  .all('/*')
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
