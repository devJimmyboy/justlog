package helix

// import (
// 	"strings"

// 	helixClient "github.com/nicklaw5/helix"
// 	log "github.com/sirupsen/logrus"
// )

// type VersionJSON struct {
// 	ID 		string `json:"id"`
// 	ImageSmall 	string `json:"image_url_1x"`
// 	ImageMedium string `json:"image_url_2x"`
// 	ImageLarge 	string `json:"image_url_4x"`
// }
// // UserData exported data from twitch
// type BadgeJSON struct {
// 	SetID		string  `json:"set_id"`
// 	Versions 	[]VersionJSON `json:"versions"`
// }

// // GetUsersByUserIds receive userData for given ids
// func (c *Client) GetBadgesByUserId(userID string) ([]BadgeJSON, error) {
// 	var filteredUserIDs []string

// 	if _, ok := userCacheByID.Load(userID); !ok {
// 		chunks := chunkBy(filteredUserIDs, 100)

// 		for _, chunk := range chunks {
// 			resp, err := c.client.GetChannelChatBadges(&helixClient.GetChatBadgeParams{
// 				BroadcasterID: chunk,
// 			})
// 			if err != nil {
// 				return BadgeJSON{}, err
// 			}

// 			log.Infof("%d GetUsersByUserIds %v", resp.StatusCode, chunk)

// 			for _, badges := range resp.Data.Badges {
// 				data := &BadgeJSON{
// 					SetID: badges.SetID,
// 					Versions: [VersionJSON{
// 						ID: badges.Versions[].ID,

// 					}],

// 				}
// 				userCacheByID.Store(user.ID, data)
// 				userCacheByUsername.Store(user.Login, data)
// 			}
// 		}
// 	}

// 		value, ok := userCacheByID.Load(userID)
// 		if !ok {
// 			log.Warningf("Could not find userId, channel might be banned: %s", userID)

// 		}
// 		result := *(value.(*UserData))

// 	return result, nil
// }

// // GetUsersByUsernames fetches userdata from helix
// func (c *Client) GetBadgesByUsernames(usernames []string) (map[string]UserData, error) {
// 	var filteredUsernames []string

// 	for _, username := range usernames {
// 		username = strings.ToLower(username)
// 		if _, ok := userCacheByUsername.Load(username); !ok {
// 			filteredUsernames = append(filteredUsernames, username)
// 		}
// 	}

// 	if len(filteredUsernames) > 0 {
// 		chunks := chunkBy(filteredUsernames, 100)

// 		for _, chunk := range chunks {
// 			resp, err := c.client.GetUsers(&helixClient.UsersParams{
// 				Logins: chunk,
// 			})
// 			if err != nil {
// 				return map[string]UserData{}, err
// 			}

// 			log.Infof("%d GetUsersByUsernames %v", resp.StatusCode, chunk)

// 			for _, user := range resp.Data.Users {
// 				data := &UserData{
// 					ID:              user.ID,
// 					Login:           user.Login,
// 					DisplayName:     user.Login,
// 					Type:            user.Type,
// 					BroadcasterType: user.BroadcasterType,
// 					Description:     user.Description,
// 					ProfileImageURL: user.ProfileImageURL,
// 					OfflineImageURL: user.OfflineImageURL,
// 					ViewCount:       user.ViewCount,
// 					Email:           user.Email,
// 				}
// 				userCacheByID.Store(user.ID, data)
// 				userCacheByUsername.Store(user.Login, data)
// 			}
// 		}
// 	}

// 	result := make(map[string]UserData)

// 	for _, username := range usernames {
// 		username = strings.ToLower(username)
// 		value, ok := userCacheByUsername.Load(username)
// 		if !ok {
// 			log.Warningf("Could not find username, channel might be banned: %s", username)
// 			continue
// 		}
// 		result[username] = *(value.(*UserData))
// 	}

// 	return result, nil
// }
