"use strict";

exports.handler = async function handler() {
  const key = process.env.GOOGLE_MAPS_BROWSER_KEY;

  if (!key) {
    return {
      statusCode: 503,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/javascript; charset=utf-8"
      },
      body: "throw new Error('Bridge live map is not configured.');"
    };
  }

  const params = new URLSearchParams({
    callback: "initBridgeSignal3DMap",
    loading: "async",
    key,
    libraries: "maps3d",
    v: "weekly"
  });

  return {
    statusCode: 302,
    headers: {
      "Cache-Control": "private, no-store",
      Location: `https://maps.googleapis.com/maps/api/js?${params.toString()}`
    },
    body: ""
  };
};
