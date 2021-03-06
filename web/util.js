const config = require('../config');

module.exports = {
	asyncFilter: (arr, predicate) => Promise.all(arr.map(predicate)).then(results => arr.filter((_v, index) => results[index])),

	// TODO: make generic. probably need to set up some generic per-guild group
	// system so people can set who can manage what features.
	/**
	 * Determines whether the sender of an HTTP request manages the given guild.
	 * @param {IncomingMessage} request
	 * @param {Client} bot
	 * @param {Db} db
	 * @param {string} guildID
	 * @returns {Promise<boolean>}
	 */
	async thisUserManagesGuild (request, bot, db, guildID) {
		if (!request.session.discordUserInfo) return false;
		// TODO: hardcoded
		if (guildID !== config.TEMP_guildID) return false;

		const guild = bot.guilds.get(guildID);
		if (!guild) return false;

		const userID = request.session.discordUserInfo.id;
		const member = guild.members.get(userID) || await guild.getRESTMember(userID);
		if (!member) return false;

		return member.permission.has('banMembers'); // TODO: renamed to member.permissions in eris@0.14.0
	},
};
