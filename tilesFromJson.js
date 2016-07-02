function tilesFromJson(json) {
  json = JSON.parse(JSON.stringify(json));
  var tiles = [];
  tilesFromJson.layerIteration(json, tiles);
  return tiles;
}

tilesFromJson.layerIteration = function layerIteration(json, tiles) {
  json.layers.forEach(function(layer, i) {
    tilesFromJson.xIteration(json, tiles, i);
  });
  return tiles;
};

tilesFromJson.xIteration = function xIteration(json, tiles, i) {
  for (var x = 0; x < json.width; x++) {
    tilesFromJson.yIteration(json, tiles, i, x);
  }
  return tiles;
};

tilesFromJson.yIteration = function yIteration(json, tiles, i, x) {
  for (var y = 0; y < json.height; y++) {
    tilesFromJson.populateTiles(json, tiles, i, x, y);
  }
  return tiles;
};

tilesFromJson.populateTiles = function populateTiles(json, tiles, i, x, y) {
  var type = json.layers[i].data[x + (y * json.width)];
  if (type !== 0) {
    tilesFromJson.addTile(json, tiles, i, x, y, type);
  }
  return tiles;
};

tilesFromJson.addTile = function addTile(json, tiles, i, x, y, type) {
  tiles.push({
    x: x * json.tilewidth,
    y: y * json.tileheight,
    type: type
  });
  return tiles;
};
