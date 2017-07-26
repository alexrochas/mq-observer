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
  <div class="col-md-6 tracker">
    <div class="card">
      <div class="card-header">
        <h4 style="float:left">${name}</h4>
        <button style="float:right" class="btn btn-primary" data-tracker="${trackerId}">X</button>
      </div>
      <div class="card-block">
        <textarea style="width: 100%" class="form-control" readonly="readonly" id="${trackerId}"></textarea>
      </div>
    </div>
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

$(document).on('click', `.tracker button`, function() {
  const trackerId = $(this).data('tracker');
  $(this).parent().parent().parent().remove();
  connections.remove(trackerId);
});

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

