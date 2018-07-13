import { Message } from '../../shared/message.js';
import { MessagingService } from '../messagingservice.js';
import { VCustomElement } from './vcustomelement.js';
const chatTemplate = document.createElement('template');
chatTemplate.innerHTML = `
	<div>
		<p>Id, sent, received, contents</p>
		<ul>
		</ul>

		<input type="text" />
	</div>
`;

// Unknown - how to handle dependencies in web components?
	// chatbox will need access to the ChatService
	// but I don't think they can take in anything in the constructor
	// https://github.com/w3c/webcomponents/issues/605
export default class ChatBox extends HTMLElement implements VCustomElement {
	private _messages: Message[] = [];
	private messagingService: MessagingService;

	constructor() {
		super();

		let shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(chatTemplate.content.cloneNode(true));
		let textInput = <HTMLInputElement>(<ShadowRoot>this.shadowRoot).querySelector('input');
		textInput.onkeypress = (event: KeyboardEvent) => {
			if(event.key === "Enter") {
				event.preventDefault();
				let fullText = textInput.value;
				this.HandleSubmitMessage(fullText);
			}
		};

		this.messagingService = new MessagingService();
		this.messagingService.RegisterCB(this.OnMessagesUpdate.bind(this));
	}

	private OnMessagesUpdate(messages: Message[]): void {
		let ulElement = <HTMLUListElement>(<ShadowRoot>this.shadowRoot).querySelector('ul');
		while (ulElement.firstChild) {
			ulElement.removeChild(ulElement.firstChild);
		}
		
		for(let msg of messages) {
			let li = document.createElement('li');
			li.innerText = `${msg.MessageId} - ${msg.Sent} - ${msg.Received} - ${msg.Contents}`;
			ulElement.appendChild(li);
		}
	}

	HandleSubmitMessage(message: string): void {
		// How can I synchronize messages between server and client?
		// If server is updating the message and sending down updates, I need to say that "This message is for that message"
		// this means that the message Ids must be generated on the client, where they originate, so the client can know where to map the response from the server

		// I can either use a UUID function or use performance timings comparing the "DateSent"

		// OR, since the server is already generating information, I have a static "ClientTransactionId" that controls which transaction a given websocket request is under
		// This can incremenet by 1, and the Pair (ClientId, TransactionId) could still be guaranteed to be unique
		// Then the server can generate a true UUID and the client doesn't need to worry about collisions!
		let senderId = 1;
		let messageToSend: Message = {
			SenderId: senderId,
			Contents: message,
			Sent: new Date(),
			MessageId: null,
			Received: null
		};

		this.messagingService.SendMessage(messageToSend);
	}

	ConnectedCallback(): void {
		console.log('connected');
	}
	DisconnectedCallback(): void {
		console.log('disconnected');
	}
	AttributeChangedCallback(): void {
		console.log('attribute changed');
	}
}

customElements.define('v-chat-box', ChatBox);