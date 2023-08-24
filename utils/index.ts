import { useEffect, useState } from "react";

export const isEmpty = (variable: any) => {
  if (variable === false) {
    return true;
  }

  if (Array.isArray(variable)) {
    return variable.length === 0;
  }

  if (variable === undefined || variable === null) {
    return true;
  }

  if (typeof variable === "string" && variable.trim() === "") {
    return true;
  }

  if (typeof variable === "object") {
    return Object.entries(variable).length === 0 && !(variable instanceof Date);
  }

  return false;
};

export const encodeQuery = (query: any, type: any) => {
  if (!isEmpty(type) && !isEmpty(query)) {
    if ("profile" === type) {
      return Buffer.from("user_id=" + query.toString(), "utf-8").toString(
        "base64"
      );
    }
    if ("post" === type) {
      return Buffer.from("postId=" + query.toString(), "utf-8").toString(
        "base64"
      );
    }
    if ("comment" === type) {
      return Buffer.from("commentId=" + query.toString(), "utf-8").toString(
        "base64"
      );
    }
    if ("referralLink" === type) {
      return Buffer.from(
        "referralAddress=" + query.toString(),
        "utf-8"
      ).toString("base64");
    }
  }
};

export const parseQueryString = (query: any) => {
  var parsed: any = Buffer.from(query, "base64").toString("utf-8");
  var vars = parsed.split("&");
  var query_string: any = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair.shift());
    var value = decodeURIComponent(pair.join("="));
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = value;
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], value];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(value);
    }
  }
  return query_string;
};

export const timeSince = (time: any) => {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "seconds", 1], // 60
    [120, "1 minute ago", "1 minute from now"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "1 hour ago", "1 hour from now"], // 60*60*2
    [86400, "hours", 3600], // 60*60*24, 60*60
    [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
    [604800, "days", 86400], // 60*60*24*7, 60*60*24
    [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
    [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
    [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    // @ts-ignore
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
};

export const getDiffTime = (date: any) => {
  var created: any = new Date(date);
  var now: any = new Date();

  var diffMs = now - created;
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  //return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas =)";

  var total = diffDays * 24 * 60 + diffHrs * 60 + diffMins;

  return total;
};

export const renderComment = (text: any) => {
  // text = "@@@____9__^^____display__@@@^^^ ds @@@____18__^^____display__@@@^^^";

  const pattern = /@@@____[0-9]*__\^\^____(.*?)__@@@\^\^\^/gim;
  const pattern_username = /(?:__\^\^____)(.*?)(?:__@@@)/;
  const pattern_id = /(?:@@@____)([0-9]+)(?:\__)/;
  const matches = text?.match(pattern);

  const patternHash = /([#][a-z\d-]+)/gim;
  const hashMatches = text?.match(patternHash);
  let link2 = "";

  if (matches && matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      let name = matches[i].match(pattern_username);
      if (name.length > 1) {
        name = name[1];
      }

      let user_id = matches[i].match(pattern_id);
      if (user_id.length > 1) {
        user_id = user_id[1];
      }
      let encode = encodeQuery(user_id, "profile");
      let link = `<a href="/dashboard/profile?${encode}" className="hover:underline text-blue-400">@${name}</a>`;

      text = text.replace(matches[i], link);
    }
  }

  if (hashMatches || hashMatches?.length > 0 || !isEmpty(hashMatches)) {
    for (let i = 0; i < hashMatches.length; i++) {
      let hash = hashMatches[i];

      hash = hash.replace(/\#/g, "");
      let link = `<a href="/dashboard/hashtag?${hash}" className="hover:underline text-blue-400">#${hash}</a>`;
      text = text.replace(hashMatches[i], link);
    }
  }

  return text;
};

export const renderUnauthComment = (text: any) => {
  // text = "@@@____9__^^____display__@@@^^^ ds @@@____18__^^____display__@@@^^^";

  const pattern = /@@@____[0-9]*__\^\^____(.*?)__@@@\^\^\^/gim;
  const pattern_username = /(?:__\^\^____)(.*?)(?:__@@@)/;
  const pattern_id = /(?:@@@____)([0-9]+)(?:\__)/;
  const matches = text?.match(pattern);

  const patternHash = /([#][a-z\d-]+)/gim;
  const hashMatches = text?.match(patternHash);
  let link2 = "";

  if (matches && matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      let name = matches[i].match(pattern_username);
      if (name.length > 1) {
        name = name[1];
      }

      let user_id = matches[i].match(pattern_id);
      if (user_id.length > 1) {
        user_id = user_id[1];
      }
      let encode = encodeQuery(user_id, "profile");
      let link = `<a href="/auth/signup" className="hover:underline text-blue-400">@${name}</a>`;

      text = text.replace(matches[i], link);
    }
  }

  if (hashMatches || hashMatches?.length > 0 || !isEmpty(hashMatches)) {
    for (let i = 0; i < hashMatches.length; i++) {
      let hash = hashMatches[i];
      let link = `<a href="/auth/signup" className="hover:underline text-blue-400">${hash}</a>`;
      text = text.replace(hashMatches[i], link);
    }
  }

  return text;
};

export const renderComment2 = (text: any) => {
  //text = "@@@____9__^^____display__@@@^^^ ds @@@____18__^^____display__@@@^^^";

  const pattern = /@@@____[0-9]*__\^\^____(.*?)__@@@\^\^\^/gim;
  const pattern_username = /(?:__\^\^____)(.*?)(?:__@@@)/;
  const pattern_id = /(?:\@@@____)([0-9]+)(?:\__)/;
  const matches = text?.match(pattern);

  if (matches && matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      let name = matches[i].match(pattern_username);

      if (name.length > 1) {
        name = name[1];
      }

      let user_id = matches[i].match(pattern_id);
      if (user_id.length > 1) {
        user_id = user_id[1];
      }
      let encode = encodeQuery(user_id, "profile");
      let link = `<a href="/dashboard/profile?${encode}" className="underline text-white">@${name}</a>`;

      text = text.replace(matches[i], link);
    }
  }

  return text;
};

export const renderCommentText = (text: any) => {
  //text = "@@@____9__^^____display__@@@^^^ ds @@@____18__^^____display__@@@^^^";
  const pattern = /@@@____[0-9]*__\^\^____(.*?)__@@@\^\^\^/gim;
  const pattern_username = /(?:__\^\^____)(.*?)(?:__@@@)/;
  const pattern_id = /(?:\@@@____)([0-9]+)(?:\__)/;
  const matches = text?.match(pattern);

  if (matches && matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      let name = matches[i].match(pattern_username);

      if (name.length > 1) {
        name = name[1];
      }

      let user_id = matches[i].match(pattern_id);
      if (user_id.length > 1) {
        user_id = user_id[1];
      }
      let encode = encodeQuery(user_id, "profile");
      let link = `@${name}`;

      text = text.replace(matches[i], link);
    }
  }

  return text;
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}


