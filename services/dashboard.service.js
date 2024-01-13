const pallier = require("../algorithm/pallier");
const bigInt = require('big-integer');
const {
  user,
  candidate,
  election,
  position,
} = require("../lib/database.connection");
const publicKey = require("../algorithm/publicKey");

class DashboardService {
  async admin() {
    try {
      
      
      const data = {
        voters: 0,
        candidates: 0,
        elections: 0,
        positions: 0,
      };
     const voters = await user.count({ where: { roleId: 2 } });
     const candidates = await candidate.count({ where: { status: 1 } });
     const elections = await election.count();
     const positions = await position.count();

      let bn1 = bigInt(parseInt(voters)).mod(publicKey.n);
      while (bn1.lt(0)) bn1 = bn1.add(publicKey.n);

        let bn2 = bigInt(parseInt(candidates)).mod(publicKey.n);
      while (bn1.lt(0)) bn1 = bn1.add(publicKey.n);

        let bn3 = bigInt(parseInt(elections)).mod(publicKey.n);
      while (bn1.lt(0)) bn1 = bn1.add(publicKey.n);

        let bn4 = bigInt(parseInt(positions)).mod(publicKey.n);
      while (bn1.lt(0)) bn1 = bn1.add(publicKey.n);

      const pailerPublicKey = new pallier.PublicKey(publicKey.n, publicKey.g);
      data.voters= pailerPublicKey.encrypt(bn1);
      data.candidates= pailerPublicKey.encrypt(bn2);
      data.elections= pailerPublicKey.encrypt(bn3);
      data.positions= pailerPublicKey.encrypt(bn4);
      // data.privateKey = privateKey;
      // data.publicKey = publicKey;
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new DashboardService();
