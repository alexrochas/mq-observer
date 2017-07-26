const socket = io();
const client = feathers();

client.configure(feathers.socketio(socket));

const messages = client.service('messages');
const connections = client.service('connections');

const toObj = (arr) => {
  const data = {};

  $(arr).each((index, obj) => {
    data[obj.name] = obj.value;
  });

  return data;
};

const generateTracker = ({name}, trackerId) => `
  <div class="col-md-6">
    <h4>${name}</h4>
    <textarea style="width: 100%" readonly="readonly" id="${trackerId}"></textarea>
  </div>
`;

const updateTracker = ({id, message}) => {
  const tracker = $(`#${id}`);
  let payload = tracker.val().trim();

  if (payload.length) {
    payload+= `\n ${message}`;
  } else {
    payload = message;
  }

  tracker.val(payload);
  tracker[0].scrollTop = tracker[0].scrollHeight;
};

messages.on('created', updateTracker);

$('#tracker-form').on('submit', function(e) {
  e.preventDefault();

  const trackerId = uuidv4();
  const data = toObj($(this).serializeArray());
  const trackerHtml = generateTracker(data, trackerId);
  $('#trackers-list').append(trackerHtml);
  connections.create({
    id: trackerId,
    name: data.name,
    exchange: data.exchange,
    url: data.url
  });
});

