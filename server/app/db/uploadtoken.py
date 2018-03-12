from bson import ObjectId


class UploadTokenRepo(object):
    def __init__(self, app):
        self.table = app.data.driver.db['uploadtokens']

    def create_token(self, project, user, token):
        self.table.insert_one({
            'project': project['_id'],
            'owner': ObjectId(user['_id']),
            'token': token
        })

    def find_token(self, token):
        return self.table.find_one({
            'token': token
        })

    def find_token_by_project(self, project_id):
        return self.table.find_one({
            'project': project_id
        })

    def get_token_from_request(self, request):
        token = request.headers.get('Authorization', None)
        if not token:
            return None

        token = self.find_token(token)
        if not token:
            return None

        return token

    def update_token(self, upload_token, value):
        self.table.update({
            '_id': upload_token['_id']
        }, {
            '$set': {
                'token': value
            }
        })
