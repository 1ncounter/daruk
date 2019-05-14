import path = require('path');
import { Daruk } from '../../../src/typings/daruk';

const mockNodeModulesPacket = path.resolve(__dirname, './node_modules/mock-middleware/index.js');
const mockNodeModulesPacket2 = path.resolve(__dirname, './node_modules/mock-middleware2/index.js');

export default function (daruk: Daruk.DarukCore) {
  return {
    globalModule: {
      module1: () => {}
    },
    middlewareOrder: [mockNodeModulesPacket, mockNodeModulesPacket2, 'configMid'],
    middleware: {
      [mockNodeModulesPacket] (mid: Function) {
        return mid('packetMid');
      },
      [mockNodeModulesPacket2] (mid: Function) {
        return mid('packetMid2');
      },
      'configMid': {
        packet: mockNodeModulesPacket,
        export (mid: Function) {
          return mid('configMid');
        }
      }
    },
    timer: {
      testTimer: {
        cronTime: '* * * * * *',
        onTick: function onTick(this: any) {
          this.stop();
        },
        onComplete: function onComplete() {
          // @ts-ignore
          daruk.timerComplete = true;
        }
      }
    },
    util: {
      util1: () => {}
    }
  };
}
