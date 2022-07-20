import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../src/config/db.config";
import { userAuthentication } from "../src/utils/userAuthentication";
import { TokenInput } from "../src/types/validationInput";
import { TicketInput } from "../src/types/validationInput";
import { createTicket } from "../src/controllers/Ticket/createTicket/createTicket";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const HEADERS = { "Content-Type": "application/json" };

    if (!req.body) {
        context.res = {
            Headers: HEADERS,
            status: 400,
            body: {
                message: "Body content is empty!",
            },
        };

        return;
    }

    connect();

    try {
        if (req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            const data: TokenInput = { token };
            const result = await userAuthentication(data);

            if (result.error) {
                context.res = {
                    Headers: HEADERS,
                    status: 500,
                    body: {
                        message: result.message,
                    },
                };
            } else {
                const body: TicketInput = req.body;
                body.reporter = result.message.id;

                const newTicket = await createTicket(body);

                if (newTicket) {
                    context.res = {
                        Headers: HEADERS,
                        status: 500,
                        body: {
                            message: newTicket.message,
                        },
                    };
                    return;
                } else {
                    context.res = {
                        Headers: HEADERS,
                        status: 200,
                        body: {
                            message: "New Ticket added/created successfully",
                        },
                    };
                }
            }

        } else {
            context.res = {
                Headers: HEADERS,
                status: 500,
                body: {
                    message: "No authorization token detected",
                },
            };
        }
    } catch (error) {
        context.res = {
            Headers: HEADERS,
            status: 500,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }

};

export default httpTrigger;